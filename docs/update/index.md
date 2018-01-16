
## Update Driver Station

- Download the update [here](http://www.ni.com/download/first-robotics-software-2017/7183/en/). You should have made an account the first time you downloaded it, you can log in with the same account.
- Unzip the file you downloaded. The password is `pLaY&4%R3aL!`
- Run `setup.exe`. It will take a *long* time to install.
    - **Uncheck Search for important messages**
    - The program will ask for a serial number. Ask me and I will give it to you.
    - When the program has installed, **uncheck Run License Manager**
- Once Driver Station is installed, open it. When you first start it, you might receive a Windows Firewall warning. Make sure you check the box that allows communication on private networks. If you forget to do this, communications with the robot might not work, and you will have to fix it in Windows Firewall settings.

## Update Python Packages

- In Command Prompt, type: `python -m pip install --upgrade pyfrc robotpy-ctre`
