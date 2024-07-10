export default function streamToBase64(readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks = [];

    readable.on('data', (chunk) => {
      chunks.push(chunk);
    });

    readable.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const base64 = buffer.toString('base64');
      resolve(base64);
    });

    readable.on('error', (error) => {
      reject(error);
    });
  });
}
