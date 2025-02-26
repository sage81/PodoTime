import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateAppointmentsTable1708700000000 implements MigrationInterface {
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
            type: 'timestamp',
          },
          {
            name: 'duration',
            type: 'int',
            comment: 'Duration in minutes',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['scheduled', 'completed', 'cancelled'],
            default: "'scheduled'",
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
      true
    )

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        columnNames: ['clientId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments')
  }
} 