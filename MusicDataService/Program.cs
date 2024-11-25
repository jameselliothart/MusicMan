using Microsoft.EntityFrameworkCore;
using MusicDataService.Commands;
using MusicDataService.Persistence;
using MusicDataService.Queries;

var AllowDevAccessPolicy = "allowDevAccessPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<ICommandHandler, SqlCommandHandler>();
builder.Services.AddScoped<IQueryHandler, SqlQueryHandler>();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: AllowDevAccessPolicy,
        policy =>
        {
            policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
            policy.WithHeaders("*");
            policy.WithMethods("*");
        }
    );
});
builder.Services.AddDbContext<MusicManContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("MusicManDatabase"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors(AllowDevAccessPolicy);
app.MapControllers();

using var scope = app.Services.CreateScope();

try
{
    var context = scope.ServiceProvider.GetService<MusicManContext>();
    context!.Database.Migrate();
}
catch (Exception ex)
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    logger?.LogError(ex, "An error occurred while migrating the database.");
}

app.Run();
