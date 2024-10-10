import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @Roles('admin', 'user')
  async findAll(@Request() req) {
    if (req.user.role === 'admin') {
      return this.projectsService.findAll();
    }
    return this.projectsService.findProjectsByUser(req.user.userId);
  }

  @Get(':id')
  @Roles('admin', 'user')
  async findOne(@Param('id') id: number, @Request() req) {
    const project = await this.projectsService.findById(id);
    if (req.user.role !== 'admin' && req.user.userId !== project.user_id) {
      throw new ForbiddenException('You can only view your own projects');
    }
    return project;
  }

  @Post()
  @Roles('admin', 'user')
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    if (
      req.user.role !== 'admin' &&
      req.user.userId !== createProjectDto.user_id
    ) {
      throw new ForbiddenException(
        'You can only create projects assigned to yourself',
      );
    }
    return this.projectsService.create(createProjectDto);
  }

  @Put(':id')
  @Roles('admin', 'user')
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    const project = await this.projectsService.findById(id);
    if (req.user.role !== 'admin' && req.user.userId !== project.user_id) {
      throw new ForbiddenException('You can only update your own projects');
    }
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  async remove(@Param('id') id: number, @Request() req) {
    const project = await this.projectsService.findById(id);
    if (req.user.role !== 'admin' && req.user.userId !== project.user_id) {
      throw new ForbiddenException('You can only delete your own projects');
    }
    return this.projectsService.remove(id);
  }
}
