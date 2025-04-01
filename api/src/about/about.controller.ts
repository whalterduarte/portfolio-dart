import { Controller, Get, Post, Body, Param, Put, Delete, Patch, HttpStatus } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto, UpdateAboutDto } from './dto/about.dto';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.findAll(),
    };
  }

  @Get('current')
  async getCurrentAbout() {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.getCurrentAbout(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.findOne(id),
    };
  }

  @Post()
  async create(@Body() createAboutDto: CreateAboutDto) {
    return {
      statusCode: HttpStatus.CREATED,
      data: await this.aboutService.create(createAboutDto),
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAboutDto: UpdateAboutDto,
  ) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.update(id, updateAboutDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.remove(id),
    };
  }

  @Patch(':id/set-active')
  async setActive(@Param('id') id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.setActive(id),
    };
  }

  // Endpoints especializados para habilidades
  @Put(':id/skills/add')
  async addSkill(@Param('id') id: string, @Body() skill: any) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.addSkill(id, skill),
    };
  }

  @Delete(':id/skills/:skillId')
  async removeSkill(
    @Param('id') id: string,
    @Param('skillId') skillId: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.removeSkill(id, skillId),
    };
  }

  // Endpoints especializados para educau00e7u00e3o
  @Put(':id/education/add')
  async addEducation(@Param('id') id: string, @Body() education: any) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.addEducation(id, education),
    };
  }

  @Delete(':id/education/:educationId')
  async removeEducation(
    @Param('id') id: string,
    @Param('educationId') educationId: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.removeEducation(id, educationId),
    };
  }

  // Endpoints especializados para experiu00eancia
  @Put(':id/experience/add')
  async addExperience(@Param('id') id: string, @Body() experience: any) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.addExperience(id, experience),
    };
  }

  @Delete(':id/experience/:experienceId')
  async removeExperience(
    @Param('id') id: string,
    @Param('experienceId') experienceId: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.aboutService.removeExperience(id, experienceId),
    };
  }
}
