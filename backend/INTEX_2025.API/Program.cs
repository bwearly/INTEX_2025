using System.Security.Claims;
using INTEX_2025.API.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using INTEX_2025.API.Data;
using INTEX_2025.API.Services;
using Microsoft.Extensions.DependencyInjection;
using RootkitAuth.API.Services;

//var builder = WebApplication.CreateBuilder(args);

//var apiKey = builder.Configuration["YouTube:ApiKey"];

//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//<<<<<<< HEAD
//builder.Services.AddHttpClient();
//=======

//>>>>>>> parent of e049087 (added a ton of security and cookies)

//builder.Services.AddDbContext<MoviesDbContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("MovieConnection")));

//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

//builder.Services.AddAuthorization();

//builder.Services.AddIdentityApiEndpoints<IdentityUser>()
//    .AddEntityFrameworkStores<ApplicationDbContext>();

//builder.Services.Configure<IdentityOptions>(options =>
//{
//    options.Password.RequireDigit = true;
//    options.Password.RequiredLength = 15;
//    options.Password.RequireNonAlphanumeric = false;
//    options.Password.RequireUppercase = false;
//    options.Password.RequireLowercase = false;
//    options.Password.RequiredUniqueChars = 5;
//    options.User.RequireUniqueEmail = true;
//    options.Lockout.MaxFailedAccessAttempts = 5;
//    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);

//    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
//    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
//});

//builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

//builder.Services.ConfigureApplicationCookie(options =>
//{
//    options.Cookie.HttpOnly = true;
//    options.Cookie.SameSite = SameSiteMode.None;
//    options.Cookie.Name = ".AspNetCore.Identity.Application";
//    options.LoginPath = "/login";
//    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
//});

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowFrontend",
//        policy =>
//        {
//            policy.WithOrigins("http://localhost:3000") // Replace with your frontend URL
//                //.AllowCredentials()
//                .AllowAnyMethod()
//                .AllowAnyHeader();
//        });
//});
//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseCors("AllowFrontend");
//app.UseHttpsRedirection();

//app.UseAuthentication();
//app.UseAuthorization();

//app.UseStaticFiles(); //Allows the posters to be implimented

//app.MapControllers();
//app.MapIdentityApi<IdentityUser>();

//app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
//{
//    await signInManager.SignOutAsync();

//    // Ensure authentication cookie is removed
//    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
//    {
//        HttpOnly = true,
//        Secure = true,
//        SameSite = SameSiteMode.None
//    });

//    return Results.Ok(new { message = "Logout successful" });
//}).RequireAuthorization();


//app.MapGet("/pingauth", (ClaimsPrincipal user) =>
//{
//    if (!user.Identity?.IsAuthenticated ?? false)
//    {
//        return Results.Unauthorized();
//    }

//    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
//    return Results.Json(new { email = email });
//}).RequireAuthorization();

//app.Run();


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MoviesDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CompetitionConnection")));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email; // Ensure email is stored in claims
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Replace with your frontend URL
                .AllowCredentials()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    // Ensure authentication cookie is removed
    context.Response.Cookies.Delete(".AspNetCore.Identity.Application");

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();


app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com"; // Ensure it's never null
    return Results.Json(new { email = email }); // Return as JSON
}).RequireAuthorization();

app.Run();