function parseDiskMap(diskMap) {
  const blocks = [];
  let fileId = 0;
  for (let i = 0; i < diskMap.length; i++) {
      const length = parseInt(diskMap[i], 10);
      const type = i % 2 === 0 ? 'file' : 'space';
      for (let j = 0; j < length; j++) {
          blocks.push(type === 'file' ? fileId : '.');
      }
      if (type === 'file') fileId++;
  }
  return blocks;
}

function compactFiles(blocks) {
  const fileBlocks = [];
  let freeSpace = 0;

  // Collect file blocks and count free space
  for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] !== '.') {
          fileBlocks.push(blocks[i]);
      } else {
          freeSpace++;
      }
  }

  // Move files to the leftmost free space
  let writeIndex = 0;
  for (let i = 0; i < fileBlocks.length; i++) {
      blocks[writeIndex] = fileBlocks[i];
      writeIndex++;
  }

  // Fill the remaining space with '.'
  while (writeIndex < blocks.length) {
      blocks[writeIndex] = '.';
      writeIndex++;
  }

  return blocks;
}

function calculateChecksum(blocks) {
  let checksum = 0;
  for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] !== '.') {
          checksum += i * parseInt(blocks[i], 10);
      }
  }
  return checksum;
}

// Exemple d'utilisation
const diskMap = "2333133121414131402";
//const blocks = parseDiskMap(diskMap);
const blocks ="00...111...2...333.44.5555.6666.777.888899"
const compactedBlocks = compactFiles(blocks);
const checksum = calculateChecksum(compactedBlocks);

console.log("Checksum:", checksum); // Affiche le checksum
