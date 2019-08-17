module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			field: 'id'
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			field: 'email'
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'password'
		},
		createdAt: {
			field: 'created_at',
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			field: 'updated_at',
			allowNull: false,
			type: DataTypes.DATE,
		},
	}, {
		tableName: 'users'
	});
};
