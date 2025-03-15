using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;

namespace API.Repositories
{
    public class DataProjectRepository
    {
        private readonly DataContext _context;

        public DataProjectRepository(DataContext context)
        {
            _context = context;
        }

        // Obtener todos los proyectos de datos
        public async Task<List<DataProject>> GetDataProjectsAsync()
        {
            return await _context.DataProjects.ToListAsync();
        }

        // Obtener un proyecto de datos por ID
        public async Task<DataProject?> GetDataProjectByIdAsync(int id)
        {
            return await _context.DataProjects.FindAsync(id);
        }

        // Agregar un nuevo proyecto de datos
        public async Task<DataProject> AddDataProjectAsync(DataProject project)
        {
            _context.DataProjects.Add(project);
            await _context.SaveChangesAsync();
            return project; // Devolver el proyecto creado
        }

        // Actualizar un proyecto de datos existente
        public async Task<bool> UpdateDataProjectAsync(DataProject project)
        {
            var existingProject = await _context.DataProjects.FindAsync(project.Id);
            if (existingProject == null)
            {
                return false; // No se encontró el proyecto, no se puede actualizar
            }

            _context.Entry(existingProject).CurrentValues.SetValues(project);
            await _context.SaveChangesAsync();
            return true; // Actualización exitosa
        }

        // Eliminar un proyecto de datos
        public async Task<bool> DeleteDataProjectAsync(int id)
        {
            var project = await _context.DataProjects.FindAsync(id);
            if (project == null)
            {
                return false; // No se encontró el proyecto, no se puede eliminar
            }

            _context.DataProjects.Remove(project);
            await _context.SaveChangesAsync();
            return true; // Eliminación exitosa
        }
    }
}
