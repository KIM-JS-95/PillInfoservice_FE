# electron init
npm init -y npm i -D electron


# electron start
npm run start

# electron build pacage import before Build 
npm install --save-dev @electron-forge/cli && npx electron-forge import

# electron Build
npm run make
