import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orders extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    orderid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    orderno: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: sequelize.literal(`('PO-'::text || to_char(nextval('po_sequence'::regclass), 'FM0000'::text))`)
    },
    userid: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userid'
      }
    },
    totalprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_pk",
        unique: true,
        fields: [
          { name: "orderid" },
        ]
      },
    ]
  });
  }
}
