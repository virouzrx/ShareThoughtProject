using Microsoft.EntityFrameworkCore.Migrations;

namespace ShareThoughtProjectApi.Migrations
{
    public partial class addeddesc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UsernameDisplayName",
                table: "AspNetUsers",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "AspNetUsers",
                newName: "UsernameDisplayName");
        }
    }
}
