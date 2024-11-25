using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MusicDataService.CommandHandlers;
using MusicDataService.Persistence;
using MusicDataService.QueryHandlers;

var AllowDevAccessPolicy = "allowDevAccessPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IMusicManRepository, MusicManRepository>();
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
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "MusicMan API",
        Description = "An ASP.NET Core Web API for keeping track of your favorite songs",
        Contact = new OpenApiContact
        {
            Name = "View the repo",
            Url = new Uri("https://github.com/jameselliothart/MusicMan")
        }
    });
});

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
