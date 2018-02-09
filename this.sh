#!/bin/sh -e 
C_ROOT=''
C_KERNEL=''
##
## Exits the script with exit code $1, spitting out message $@ to stderr
error() {
    local ecode="$1"
    shift
    echo "$*" 1>&2
    exit "$ecode"
}

##
## Ensure this script is run from a Cros shell (as chronos or superuser)
if [ "x$USER" != 'xchronos' -a "x$SUDO_USER" != 'xchronos' ]; then
  error 1 "This script has to be run from a Cros shell (as chronos or superuser) - exiting!"
fi

#Following routine borrowed from @drinkcat ;)
ROOTDEVICE="`rootdev -d -s`"
if [ -z "$ROOTDEVICE" ]; then
    error 1 "Cannot find root device."
fi
if [ ! -b "$ROOTDEVICE" ]; then
    error 1 "$ROOTDEVICE is not a block device."
fi
# If $ROOTDEVICE ends with a number (e.g. mmcblk0), partitions are named
# ${ROOTDEVICE}pX (e.g. mmcblk0p1). If not (e.g. sda), they are named
# ${ROOTDEVICE}X (e.g. sda1).
ROOTDEVICEPREFIX="$ROOTDEVICE"
if [ "${ROOTDEVICE%[0-9]}" != "$ROOTDEVICE" ]; then
    ROOTDEVICEPREFIX="${ROOTDEVICE}p"
fi

##
## 0.Disable verified boot : (You could do this later, but you have to do this before step 5. IT WON'T BOOT OTHERWISE!)
echo "## 0.Disable verified boot"
echo -n "Changing system to allow booting unsigned images: "
sudo crossystem dev_boot_signed_only=0 || ( echo; error 2 "*** Couldn't disable 'verified boot'" )
echo 'crossystem dev_boot_signed_only=0'
sleep 3 && echo

##
## 1.Get current root & assign current kernel
echo "## 1.Get current root & assign current kernel"
echo -n "Determining current kernel = "
C_ROOT=`rootdev -s`
if [ $C_ROOT = ${ROOTDEVICEPREFIX}3 ]; then C_KERNEL=2; else C_KERNEL=4; fi
echo "$C_KERNEL"
sleep 3 && echo

##
## 2.Copy the existing kernel configuration into a file
echo "## 2.Copy the existing kernel configuration into a file"
echo "Copying current kernel into file = kernel$C_KERNEL"
sudo /usr/share/vboot/bin/make_dev_ssd.sh --save_config /tmp/x --partitions $C_KERNEL || ( echo; error 2 "*** Couldn't create kernel config file" )
sleep 3 && echo

##
## 3.Edit the config file and add 'disablevmx=off' + 'lsm.module_locking=0' to the config line
echo "## 3.Edit the config file and add 'disablevmx=off' + 'lsm.module_locking=0' to the config line"
if grep --color 'disablevmx=off lsm.module_locking=0' /tmp/x.$C_KERNEL ; then
  echo; error 255 "*** Kernel configuraiton already modified - exiting"
fi 
echo -n "Editing /tmp/x.$C_KERNEL to append = "
sudo sed -i -e 's/$/ disablevmx=off lsm.module_locking=0/' /tmp/x.$C_KERNEL || ( echo; error 2 "*** Couldn't edit kernel config file" )
echo "disablevmx=off lsm.module_locking=0"
sleep 3 && echo

##
## 4.Save the current kernel configuration and reload the new one
echo "## 4.Save the current kernel configuration and reload the new one"
echo -n "[ press ENTER to continue - Ctrl-C to abort ] "; read DOIT
echo "Reloading the kernel configuration from /tmp/x.$C_KERNEL"
sudo /usr/share/vboot/bin/make_dev_ssd.sh --set_config /tmp/x --partitions $C_KERNEL || ( echo; error 2 "*** Couldn't reload kernel configuration" )
sleep 3 && echo

##
## 5.reboot, and enjoy VT-x extensions
echo "## 5.reboot, and enjoy VT-x extensions"
echo "All done - rebooting..."
echo -n "[ press ENTER to continue - Ctrl-C to abort ] "; read DOIT
sudo reboot
exit 