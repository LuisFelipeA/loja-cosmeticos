import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableOrder1734803644082 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.order (
                id integer NOT NULL,
                user_id INT REFERENCES public.user(id) ON DELETE CASCADE NOT NULL,
                order_date timestamp without time zone DEFAULT now() NOT NULL,
                status VARCHAR(50) NOT NULL,
                total_amount DECIMAL(10, 2) NOT NULL,
                shipping_address TEXT,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)   
            );

            CREATE SEQUENCE public.order_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.order_id_seq OWNED BY public.order.id;

            ALTER TABLE ONLY public.order ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);
    
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            drop table public.order;    
        `);
    }

}
