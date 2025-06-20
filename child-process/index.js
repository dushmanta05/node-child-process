console.log('Starting child process with Node', process.version);

(async () => {
  for (let i = 1; i <= 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Count: ${i}`);
  }
  console.log('Child process completed');
})();
