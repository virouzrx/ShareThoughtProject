using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShareThoughtProjectApi.Migrations
{
    public partial class addedPromotionRequestTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PromotionRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestCreationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PromotionRequestContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestStatus = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PromotionRequests", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PromotionRequests");
        }
    }
}
