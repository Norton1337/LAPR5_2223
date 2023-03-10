using EletricGo.Domain.Shared;
using System.Threading.Tasks;

namespace EletricGo.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EletricGoDBContext _context;

        public UnitOfWork(EletricGoDBContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}