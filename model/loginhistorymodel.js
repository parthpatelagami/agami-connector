const loginHistoryModel = (sequelize, Sequelize) => {
  const userMst = sequelize.define(
    "user_live_connection_history",
    {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      AGENT_ID: {
        type: Sequelize.INTEGER,
      },
      CONNECT_TIME: {
        type: Sequelize.DATE,
      },
      DISCONNECT_TIME: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "user_live_connection_history",
      timestamps: false,
    }
  );
  return userMst;
};
export default loginHistoryModel;
