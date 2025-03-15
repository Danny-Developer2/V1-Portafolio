﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.2");

            modelBuilder.Entity("API.Entities.ActiveSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("Expiration")
                        .HasColumnType("TEXT");

                    b.Property<string>("TokenHash")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("ActiveSessions");
                });

            modelBuilder.Entity("API.Entities.AppConcactMessage", b =>
                {
                    b.Property<int>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("MessageId");

                    b.ToTable("ContactMessages");
                });

            modelBuilder.Entity("API.Entities.AppExperience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Experiences");
                });

            modelBuilder.Entity("API.Entities.AppProyect", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ImgUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Technology")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("API.Entities.AppSkill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("IconUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Percentage")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Token")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.DataProject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AchievementUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("DataProjects");
                });

            modelBuilder.Entity("API.Entities.ProyectExperience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ExperienceId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ExperienceId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProyectExperience");
                });

            modelBuilder.Entity("API.Entities.ProyectSkill", b =>
                {
                    b.Property<int>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SkillId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Id")
                        .HasColumnType("INTEGER");

                    b.HasKey("ProjectId", "SkillId");

                    b.HasIndex("SkillId");

                    b.ToTable("ProjectSkills");
                });

            modelBuilder.Entity("API.Entities.UserProyect", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ProjectId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AppSkillId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Id")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "ProjectId");

                    b.HasIndex("AppSkillId");

                    b.HasIndex("ProjectId");

                    b.ToTable("UserProyects", (string)null);
                });

            modelBuilder.Entity("API.Entities.UserSkill", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SkillId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AppProyectId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Id")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "SkillId");

                    b.HasIndex("AppProyectId");

                    b.HasIndex("SkillId");

                    b.ToTable("UserSkills");
                });

            modelBuilder.Entity("AppSkillAppUser", b =>
                {
                    b.Property<int>("SkillsId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UsersId")
                        .HasColumnType("INTEGER");

                    b.HasKey("SkillsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("AppSkillAppUser");
                });

            modelBuilder.Entity("API.Entities.AppExperience", b =>
                {
                    b.HasOne("API.Entities.AppUser", "User")
                        .WithMany("Experiences")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Entities.ProyectExperience", b =>
                {
                    b.HasOne("API.Entities.AppExperience", "Experience")
                        .WithMany()
                        .HasForeignKey("ExperienceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.AppProyect", "Project")
                        .WithMany("ProyectExperience")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Experience");

                    b.Navigation("Project");
                });

            modelBuilder.Entity("API.Entities.ProyectSkill", b =>
                {
                    b.HasOne("API.Entities.AppProyect", "Project")
                        .WithMany("ProyectSkills")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.AppSkill", "Skill")
                        .WithMany("ProyectSkills")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("Skill");
                });

            modelBuilder.Entity("API.Entities.UserProyect", b =>
                {
                    b.HasOne("API.Entities.AppSkill", null)
                        .WithMany("UserProyects")
                        .HasForeignKey("AppSkillId");

                    b.HasOne("API.Entities.AppProyect", "Project")
                        .WithMany("UserProyects")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.AppUser", "User")
                        .WithMany("UserProyects")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Entities.UserSkill", b =>
                {
                    b.HasOne("API.Entities.AppProyect", null)
                        .WithMany("UserSkills")
                        .HasForeignKey("AppProyectId");

                    b.HasOne("API.Entities.AppSkill", "Skill")
                        .WithMany("UserSkills")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.AppUser", "User")
                        .WithMany("UserSkills")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Skill");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AppSkillAppUser", b =>
                {
                    b.HasOne("API.Entities.AppSkill", null)
                        .WithMany()
                        .HasForeignKey("SkillsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.Entities.AppProyect", b =>
                {
                    b.Navigation("ProyectExperience");

                    b.Navigation("ProyectSkills");

                    b.Navigation("UserProyects");

                    b.Navigation("UserSkills");
                });

            modelBuilder.Entity("API.Entities.AppSkill", b =>
                {
                    b.Navigation("ProyectSkills");

                    b.Navigation("UserProyects");

                    b.Navigation("UserSkills");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("Experiences");

                    b.Navigation("UserProyects");

                    b.Navigation("UserSkills");
                });
#pragma warning restore 612, 618
        }
    }
}
