using Microsoft.EntityFrameworkCore.Migrations;

namespace ShareThoughtProject.Migrations
{
    public partial class addedtolowerhashtagname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HashtagNameInLower",
                table: "Hashtags",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HashtagNameInLower",
                table: "Hashtags");
        }
    }
}
