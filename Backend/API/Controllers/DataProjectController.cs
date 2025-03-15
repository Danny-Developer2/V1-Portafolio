using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataProjectController : ControllerBase
    {
        private readonly DataContext _context;

        private readonly DataProjectRepository _dataProjectRepository;

        public DataProjectController(DataContext context, DataProjectRepository dataProjectRepository)
        {
            _context = context;

            _dataProjectRepository = dataProjectRepository;
        }


        // Obtener todos los proyectos de datos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DataProjectDTO>>> GetDataProjects()
        {
            var dataProjects = await _dataProjectRepository.GetDataProjectsAsync();

            // Convertir la lista de entidades a DTOs
            var dataProjectsDTO = dataProjects.Select(project => new DataProjectDTO
            {
                Id = project.Id,
                Name = project.Name,
                AchievementUrl = project.AchievementUrl,
                ImageUrl = project.ImageUrl,
                Description = project.Description
            }).ToList();

            return Ok(dataProjectsDTO);
        }

        // Obtener un proyecto de datos por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<DataProjectDTO>> GetDataProjectById(int id)
        {
            var project = await _dataProjectRepository.GetDataProjectByIdAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            // Convertir la entidad a DTO
            var projectDTO = new DataProjectDTO
            {
                Id = project.Id,
                Name = project.Name,
                AchievementUrl = project.AchievementUrl,
                ImageUrl = project.ImageUrl,
                Description = project.Description
            };

            return Ok(projectDTO);
        }

        // Agregar un nuevo proyecto de datos
        [HttpPost]
        public async Task<ActionResult<DataProjectDTO>> AddDataProject(DataProjectDTO projectDTO)
        {
            var project = new DataProject
            {
                Id = 0,
                Name = projectDTO.Name,
                AchievementUrl = projectDTO.AchievementUrl,
                ImageUrl = projectDTO.ImageUrl,
                Description = projectDTO.Description
            };

            var createdProject = await _dataProjectRepository.AddDataProjectAsync(project);

            // Convertir la entidad creada a DTO
            var createdProjectDTO = new DataProjectDTO
            {
                Id = createdProject.Id,
                Name = createdProject.Name,
                AchievementUrl = createdProject.AchievementUrl,
                ImageUrl = createdProject.ImageUrl,
                Description = createdProject.Description
            };

            return CreatedAtAction(nameof(GetDataProjectById), new { id = createdProjectDTO.Id }, createdProjectDTO);
        }

        // Actualizar un proyecto de datos existente
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDataProject(int id, DataProjectDTO projectDTO)
        {
            var project = new DataProject
            {
                Id = id,
                Name = projectDTO.Name,
                AchievementUrl = projectDTO.AchievementUrl,
                ImageUrl = projectDTO.ImageUrl,
                Description = projectDTO.Description
            };

            var result = await _dataProjectRepository.UpdateDataProjectAsync(project);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // Eliminar un proyecto de datos
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDataProject(int id)
        {
            var result = await _dataProjectRepository.DeleteDataProjectAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}


    
