# MusicMan

A music data management app allowing users to organize and track information related to their favorite songs.

Developed on Ubuntu 22.04.5 LTS.

## Running

In the project root execute:
```sh
docker-compose up --build
```
This will build and start all the required services:

- postgres
- music data service (.NET 8 / C# backend)
- web (React / Typescript frontend)

The MusicMan site will be available on http://localhost (**not** http*s*).
OpenAPI / Swagger documentation for  the data service will be available at http://localhost:5000/swagger/index.html.

## Features

### Music Man Web UI

#### Functional

- On opening, the page retrieves songs from the underlying datastore
- Add songs with the 'Add a song' + button
- Delete songs with the Trash icon button
- Update songs:
  1. Enable editing with the Pencil icon button on the left of each row
  2. Start typing: The adjoining Artist cell is immediately focused and able to receive edits
    - Unfortunately there is a [bug in ag-grid](https://github.com/ag-grid/ag-grid/issues/7809) which makes this UX clunky (discovered late in this project)
    - The intended effect is cell double-click styling on the neighboring Artist cell
    - The trick to "solve" the issue creates subtle and unacceptable bugs
  3. Tab navigate or single- or double- click into any cell of the row to make further edits
  4. Click the Save (floppy disk) icon button
- All fields are required, must be non-whitespace, and not longer than 100 characters
- Invalid field values are highlighted

#### Technical

- Execute tests with `npm test` inside the `web` directory
- Tests follow the BDD style

### Music Man Data Service

- OpenAPI / Swagger documentation is available at http://localhost:5000/swagger/index.html
- Execute tests with `dotnet test` inside the `MusicDataService.Tests` directory
- Test naming follows the BDD style

#### PostgreSQL Integration

- Uses EF Core to facilitate PostgreSQL access
- On startup, the service executes EF database migrations
  - Currently, this is limited to the database and `songs` table creation
  - In a production application, this design would require careful consideration of tradeoffs

## Design Decisions

In general, this project tries to follow Domain Driven Design (DDD) principles.
The structure of both front and back end components communicates that they are centered around the management of Songs by placing the standard folders (Controllers, components, models, etc.) underneath the domain entity (in this case only Song) to which they are related.
This organization would be mirrored if the application expanded to model Artists and Albums as well in the future, allowing a correspondence between the structure of the business domain and the structure of the code.
The use of this [ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html) eases communication between developers and users.

Some design details are highlighted below.

- The client is responsible for generating Song ids in the form of GUIDs
  - Avoids a tight coupling to the database for id creation
  - As with anything, there are tradeoffs to this approach
- Use of Data Transfer Objects (DTOs)
  - The Music Data Service interfaces with clients purely through DTOs
  - In exchange for some redundancy, this allows better decoupling of clients' I/O with the service's internals
- Use of Commands, Queries, and associated Handlers
  - Allows us to follow CQS / CQRS, keeping the logic and flow of the application clean
  - Keeps logic out of the Controller which is hard to test and debug as it is fundamentally [impure](https://en.wikipedia.org/wiki/Pure_function)
  - Command/Query decoupling easily allows for separate read/write datastores (e.g. normalized write for data validity, denormalized read for faster queries with few joins - though there is only one table in the application at this time)
- Configuring Entity Framework POCO code-first entities with `OnModelCreating`
  - Maps the domain (i.e. `Song`) to the persistence layer without contamination (c.f. [MS docs](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-implementation-entity-framework-core#implement-custom-repositories-with-entity-framework-core))
  - Not a big concern in a CRUD app devoid of business logic but a good principle nonetheless
- Use of Result and Error types
  - Improves control flow and code readability
  - Allows gracefully handling known possible Errors instead of throwing Exceptions
  - A common approach in functional programming for good reason