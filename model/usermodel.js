const userModel = (sequelize, Sequelize) => {
  const userMst = sequelize.define('agent_status_record', {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    AGENT_ID: {
      type: Sequelize.INTEGER
    },
    AGENT_STATUS_ID: {
      type: Sequelize.INTEGER
    },
    LOGIN_TIME: {
      type: Sequelize.DATE
    },
    LOGOUT_TIME: {
      type: Sequelize.DATE
    },
    COMPANY_ID: {
      type: Sequelize.INTEGER
    },
    ACTION_FROM: {
      type: Sequelize.ENUM('1','0'),
      defaultValue: '0',
      allowNull: false
    }
  }, {
    tableName: 'agent_status_record',
    timestamps: false // Set timestamps option to false
  });
  return userMst;
};

/*  const userModel = (sequelize, Sequelize) => {
  const userMst = sequelize.define('user_mst', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    fullname: {
      type: Sequelize.STRING
    }
  }, {
    tableName: 'user_mst',
    timestamps: false // Set timestamps option to false
  });
  return userMst;
};  */

export default userModel;
