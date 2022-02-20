using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShareThoughtProject.Migrations
{
    public partial class AddedFollowCounter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HashtagFollows",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    HashtagId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FollowDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HashtagFollows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HashtagFollows_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HashtagFollows_Hashtags_HashtagId",
                        column: x => x.HashtagId,
                        principalTable: "Hashtags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HashtagFollows_HashtagId",
                table: "HashtagFollows",
                column: "HashtagId");

            migrationBuilder.CreateIndex(
                name: "IX_HashtagFollows_UserId",
                table: "HashtagFollows",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HashtagFollows");
        }
    }
}
