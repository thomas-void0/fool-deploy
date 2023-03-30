import net from 'net';

/**
 * Probe whether is valid for port, Until a valid port number is assigned
 * @param port
 * @returns
 */
function getValidPort(port: number): Promise<number> {
  return new Promise(async (resolve) => {
    let _port = port;
    while (_port) {
      const result = await probePort(_port);
      if (result) return resolve(_port);
      _port++;
    }
  });
}

function probePort(port: number) {
  const server = net.createServer().listen(port);

  return new Promise(function (resolve) {
    server.on('listening', function () {
      server.close();
      resolve(true);
    });
    server.on('error', function (err: any) {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export default getValidPort;
