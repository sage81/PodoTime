import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAppointmentsTable1708626100000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'clientId',
            type: 'uuid',
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'startTime',
            type: 'time',
          },
          {
            name: 'endTime',
            type: 'time',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'scheduled'", // scheduled, completed, cancelled
          },
          {
            name: 'serviceType',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'notes',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Додаємо зовнішній ключ для зв'язку з таблицею клієнтів
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        columnNames: ['clientId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('appointments');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('clientId') !== -1,
    );
    await queryRunner.dropForeignKey('appointments', foreignKey);
    await queryRunner.dropTable('appointments');
  }
} 