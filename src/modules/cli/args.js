const getArguments = () => {
  const args = {};

  process.argv.slice(2).forEach((arg) => {
    const [key, value] = arg.split('=');

    if (key.startsWith('--')) {
      args[key.slice(2)] = value;
    }
  });

  return args;
};

export default getArguments;
