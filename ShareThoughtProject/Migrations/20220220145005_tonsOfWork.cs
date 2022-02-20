using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShareThoughtProject.Migrations
{
    public partial class tonsOfWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentFlagStatus",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "FlagReason",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "FlagReason",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "FlagStatus",
                table: "Comments");

            migrationBuilder.AddColumn<string>(
                name: "ResolverId",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ResolverId",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CommentScore",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PostScore",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    ReportId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReporterId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SameReportsCount = table.Column<int>(type: "int", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReportedEntityType = table.Column<int>(type: "int", nullable: false),
                    CurrentFlagStatus = table.Column<int>(type: "int", nullable: false),
                    FlagReason = table.Column<int>(type: "int", nullable: true),
                    IsResolved = table.Column<bool>(type: "bit", nullable: false),
                    ResolverId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReportedPostId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ReportedCommentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.ReportId);
                    table.ForeignKey(
                        name: "FK_Reports_AspNetUsers_ReporterId",
                        column: x => x.ReporterId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_AspNetUsers_ResolverId",
                        column: x => x.ResolverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_Comments_ReportedCommentId",
                        column: x => x.ReportedCommentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reports_Posts_ReportedPostId",
                        column: x => x.ReportedPostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReportedCommentId",
                table: "Reports",
                column: "ReportedCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReportedPostId",
                table: "Reports",
                column: "ReportedPostId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ReporterId",
                table: "Reports",
                column: "ReporterId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ResolverId",
                table: "Reports",
                column: "ResolverId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropColumn(
                name: "ResolverId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "ResolverId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "CommentScore",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "PostScore",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "CurrentFlagStatus",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FlagReason",
                table: "Posts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FlagReason",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "FlagStatus",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
