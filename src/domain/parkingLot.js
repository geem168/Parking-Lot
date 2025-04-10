const Car = require("./car"); // Mengimpor class Car
const ParkingTicket = require("./parking-ticket"); // Mengimpor class ParkingTicket

class ParkingLot {
  constructor(capacity) {
    this.capacity = capacity;
    this.parkedCars = [];
    this.ticketCounter = 1;
  }

  // Method untuk parkir mobil
  park(car) {
    console.log(`Mencoba parkir mobil dengan plat: ${car.plate}`);

    if (!(car instanceof Car)) {
      throw new Error("Only objects of Car can be parked");
    }

    if (this.parkedCars.length >= this.capacity) {
      console.log("Parkiran penuh!");
      return "Parkiran penuh!";
    }

    // Memberikan tiket untuk mobil yang parkir
    const ticket = new ParkingTicket(`TICKET-${this.ticketCounter++}`);
    car.ticket = ticket; // Menyimpan tiket di objek mobil
    this.parkedCars.push(car); // Simpan mobil yang parkir
    console.log(
      `Mobil ${car.plate} parkir dengan tiket ${ticket.ticketNumber}`
    );
    return `Mobil ${car.plate} berhasil parkir dengan tiket ${ticket.ticketNumber}`;
  }

  // Method untuk mengeluarkan mobil berdasarkan tiket parkir
  keluar(ticketNumber) {
    console.log(`Mencoba mengeluarkan mobil dengan tiket: ${ticketNumber}`);

    const car = this.parkedCars.find(
      (car) => car.ticket && car.ticket.ticketNumber === ticketNumber
    );
    if (!car) {
      console.log("Mobil dengan tiket ini tidak ditemukan!");
      return "Mobil dengan tiket ini tidak ditemukan!";
    }

    this.parkedCars = this.parkedCars.filter((parkedCar) => parkedCar !== car); // Hapus mobil dari parkiran
    console.log(`Mobil ${car.plate} berhasil keluar dari parkir!`);
    return `Mobil ${car.plate} berhasil keluar dari parkir!`;
  }

  // Method untuk melihat total mobil yang parkir
  totalParked() {
    console.log(`Jumlah mobil yang terparkir: ${this.parkedCars.length}`);
    return this.parkedCars.length;
  }
}

module.exports = ParkingLot;
