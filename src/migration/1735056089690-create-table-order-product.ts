import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableOrderProduct1735056089690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE order_product (
                id INTEGER PRIMARY KEY,
                order_id INT NOT NULL REFERENCES public.order(id) ON DELETE CASCADE,
                product_id INT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
                quantity INT NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL
            );


            CREATE SEQUENCE public.order_product_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.order_product_id_seq OWNED BY public.order_product.id;

            ALTER TABLE ONLY public.order_product ALTER COLUMN id SET DEFAULT nextval('public.order_product_id_seq'::regclass);
    
        `)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.order_product;    
        `);
    }

}
