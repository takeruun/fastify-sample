import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserTodo1672836678808 implements MigrationInterface {
    name = 'updateUserTodo1672836678808'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`updatedAt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`createdAt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updatedAt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createdAt\` varchar(255) NOT NULL`);
    }

}
