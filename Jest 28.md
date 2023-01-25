Upgrade to Jest 28
------------------

Changes:
- TS 4.6.4
- Jest 28.1
- ts-jest 28.0.2
- firebase 9.8.1

- Builds and runs OK
- PW runs OK
- Errors running jest in IDE - export on @firebase/auth, @firebase/storage - swc
- Errors running jest at command line - exactly the same
- babel-jest

Theories:
- Jest needs to transform these files
- Jest has a problem with ESM - see blog
- 