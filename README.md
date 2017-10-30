# multi-clip-monolith

**Multi-clip for OSX**

A minimalistic multi clip menu that works on mac.


**The end goal...**

A minimalistic multi clip menu that works the same on both mac and windows.


**Build on Mac**

  - Install node v8.4.0 (```brew install node```)
  - Clone repo
  - ```npm install```
  - ```npm start`````
 
**Build on Windows**

  - Install node 6.11.5 (or 6.11.4) - https://nodejs.org/en/download/
  - Run ```npm install --global windows-build-tools --add-python-to-path=true```
  - Install Visual Studio 2017 Community Edition
  - Create a new C++ project (install all default dependencies and make sure to include VC++ 2015.3 toolset)
  - All dependencies should be setup at this point
  - Clone repo
  - npm install
  - Run: ```.\node_modules\.bin\electron-rebuild.cmd```
  - npm start

**Known Issues**

  - Clip menu isn't positioned correctly on high DPI devices (validated on a Surface Pro 3/4 tablet, but suspect all high DPI devices)
  - App broken on windows due to hiding the menu w/ mac specific function

## License

[(MIT)](LICENSE.md)
