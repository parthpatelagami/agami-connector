const loginHistoryModel = (sequelize, Sequelize) => {
  const userMst = sequelize.define(
    "user_login_history",
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
      LOGIN_TIME: {
        type: Sequelize.DATE,
      },
      LOGOUT_TIME: {
        type: Sequelize.DATE,
      },
    },
    {
      tableName: "user_login_history",
      timestamps: false,
    }
  );
  return userMst;
};
export default loginHistoryModel;
