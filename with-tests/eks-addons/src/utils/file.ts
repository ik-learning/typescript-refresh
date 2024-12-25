import fs from 'node:fs';

const writeToFile = (user: Object, filename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const userJson = JSON.stringify(user);

    fs.writeFile(filename, userJson, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export default writeToFile;
