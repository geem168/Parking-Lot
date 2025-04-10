const ParkingLot = require("../domain/parkingLot");
const Car = require("../domain/car");

describe("ParkingLot", () => {
  let parkingLot;

  // Setiap tes dimulai dengan parkiran baru
  beforeEach(() => {
    parkingLot = new ParkingLot(2); // Set kapasitas parkiran 2 mobil
  });

  it("should park a car and assign a ticket", () => {
    const car = new Car("B 1234 ABC");
    const result = parkingLot.park(car);
    expect(result).toBe(
      "Mobil B 1234 ABC berhasil parkir dengan tiket TICKET-1"
    );
    expect(car.ticket.ticketNumber).toBe("TICKET-1"); // Mengecek apakah tiket ter-assigned dengan benar
  });

  it("should not park a car if parking lot is full", () => {
    const car1 = new Car("B 1234 ABC");
    const car2 = new Car("B 5678 DEF");
    const car3 = new Car("B 9876 GHI");
    parkingLot.park(car1);
    parkingLot.park(car2);
    const result = parkingLot.park(car3);
    expect(result).toBe("Parkiran penuh!"); // Parkir penuh, jadi mobil ke-3 gak bisa parkir
  });

  it("should retrieve a car using ticket", () => {
    const car = new Car("B 1234 ABC");
    parkingLot.park(car);
    const result = parkingLot.keluar("TICKET-1"); // Mengambil mobil dengan tiket TICKET-1
    expect(result).toBe("Mobil B 1234 ABC berhasil keluar dari parkir!");
  });

  it("should return error if car ticket is not found", () => {
    const car = new Car("B 1234 ABC");
    parkingLot.park(car);
    const result = parkingLot.keluar("TICKET-999"); // Menggunakan tiket yang tidak ada
    expect(result).toBe("Mobil dengan tiket ini tidak ditemukan!");
  });

  it("should return total parked cars", () => {
    const car1 = new Car("B 1234 ABC");
    const car2 = new Car("B 5678 DEF");
    parkingLot.park(car1);
    parkingLot.park(car2);
    expect(parkingLot.totalParked()).toBe(2); // Total mobil yang parkir harus 2
  });

  it("should return not parked cars", () => {
    const car1 = new Car("B 1234 ABC");
    expect(() => parkingLot.park("car")).toThrow(
      "Only objects of Car can be parked"
    ); // harus mobil
  });
});
