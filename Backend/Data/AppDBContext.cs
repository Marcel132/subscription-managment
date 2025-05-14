using Microsoft.EntityFrameworkCore;
using SubscriptionApi.Modules;

namespace SubscriptionAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<User> Users => Set<User>();
}
