import { MigrationInterface, QueryRunner } from "typeorm";

export class createTodo1672830138205 implements MigrationInterface {
    name = 'createTodo1672830138205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todo\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`describe\` varchar(255) NOT NULL, \`createdAt\` varchar(255) NOT NULL, \`updatedAt\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`todo\``);
    }

}
