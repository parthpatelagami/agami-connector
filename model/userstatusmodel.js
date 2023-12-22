const userLiveStatusModel = (sequelize, Sequelize) => {
  const userMst = sequelize.define(
    "user_live_status",
    {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      AGENT_ID: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      STATUS_ID: {
        type: Sequelize.INTEGER,
      },
      LOGIN_TIME: {
        type: Sequelize.DATE,
      },
      LOGOUT_TIME: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "user_live_status",
      timestamps: false,
    }
  );
  return userMst;
};
export default userLiveStatusModel;
