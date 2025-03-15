using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppSkillId",
                table: "UserProyects",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProyects_AppSkillId",
                table: "UserProyects",
                column: "AppSkillId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProyects_Skills_AppSkillId",
                table: "UserProyects",
                column: "AppSkillId",
                principalTable: "Skills",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProyects_Skills_AppSkillId",
                table: "UserProyects");

            migrationBuilder.DropIndex(
                name: "IX_UserProyects_AppSkillId",
                table: "UserProyects");

            migrationBuilder.DropColumn(
                name: "AppSkillId",
                table: "UserProyects");
        }
    }
}
