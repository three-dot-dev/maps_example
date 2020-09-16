function hitungJumlahPetugas(intensitas) {
  let count = 0;

  for (let i = 1; i < intensitas; i++) {
    if (i % 4 === 0) {
      count += 1;
    }
  }
  if (count === 0) {
    count = 1;
  }

  return count;
}

console.log(`Intensitas 4, jumlah petugas = ${hitungJumlahPetugas(4)}`);
console.log(`Intensitas 14, jumlah petugas = ${hitungJumlahPetugas(14)}`);
console.log(`Intensitas 1, jumlah petugas = ${hitungJumlahPetugas(1)}`);
