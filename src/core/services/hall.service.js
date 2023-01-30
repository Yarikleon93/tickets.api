const hallStore = require("../../infrastructure/store/hall.store");
const ticketStore = require("../../infrastructure/store/ticket.store");
const seatStore = require("../../infrastructure/store/seat.store");
const sectorStore = require("../../infrastructure/store/sector.store");
const { uniqBy } = require("lodash");
const logger = require("../../utils/loggers/logger");

module.exports = class HallService {
  static async createHall(data) {
    try {
      const name = data.name;

      const cols = Math.max(...data.seats.map((v) => v.colPosition));
      const rows = Math.max(...data.seats.map((v) => v.rowPosition));

      const hall = await hallStore.createHall({ name, cols, rows });
      const sectorNames = uniqBy(
        data.seats.filter((v) => v.sectorName).map((v) => v.sectorName)
      );

      const sectors = await sectorStore.createSectors(sectorNames, hall.id);

      let models = data.seats.map((seat) => {
        const sector = sectors.find(
          (sector) => sector.name === seat.sectorName
        );
        return {
          rowPosition: seat.rowPosition,
          colPosition: seat.colPosition,
          place: seat.place,
          row: seat.row,
          hallId: hall.id,
          ...(sector ? { sectorId: sector.id } : {}),
        };
      });
      await seatStore.createSeats(models);
      return hall;
    } catch (err) {
      logger.warn(err.message);
    }
  }

  static async getHallBySession(sessionId) {
    const [hall, tickets] = await Promise.all([
      hallStore.getHallBySession(sessionId),
      ticketStore.getTickets({ sessionId }),
    ]);
    const reservedSeatIds = tickets
      .filter((v) => v.userId)
      .map((v) => v.seatId);
    hall.seats = (await seatStore.getSeatsByHall(hall.id)).map((seat) => ({
      ...seat,
      isReserved: reservedSeatIds.includes(seat.id),
    }));
    return hall;
  }

  static async getHalls() {
    const halls = await hallStore.getHalls();
    async function anAsyncFunction(item) {
      const hall = item;
      hall.seats = await seatStore.getSeatsByHall(hall.id);
      return hall;
    }
    return Promise.all(
      halls.map((currentHall) => anAsyncFunction(currentHall))
    );
  }
};
