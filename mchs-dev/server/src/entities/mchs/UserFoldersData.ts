import { Column, Entity } from "typeorm";

@Entity("user_folders_data", { schema: "mchs" })
export class UserFoldersData {
  @Column("int", { primary: true, name: "folder_id", unsigned: true })
  folderId: number;

  @Column("bigint", {
    primary: true,
    name: "id_call",
    comment: "id звонка",
    unsigned: true,
  })
  idCall: string;
}
