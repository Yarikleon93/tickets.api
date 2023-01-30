module.exports = (sequelize, DataTypes) => {
  return {
    allowNull: false,
    defaultValue: sequelize.fn('NOW'),
    type: DataTypes.DATE,
  }
}