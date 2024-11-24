# Use the official .NET 8 SDK image for building the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./*.csproj ./MusicDataService/
RUN dotnet restore MusicDataService

COPY ./ ./MusicDataService/
RUN dotnet publish MusicDataService -c Release -o out

# Use the official ASP.NET Core Runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
EXPOSE 5000
EXPOSE 5001
ENTRYPOINT ["dotnet", "MusicDataService.dll"]
