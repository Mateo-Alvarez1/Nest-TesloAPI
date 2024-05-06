import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStratgy } from './strategies/Jwt.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStratgy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    // Definimos la estrategia de registro
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '2h' },
        };
      },
    }),
    // <---> SYNC SOLUTION <--->
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '2h' },
    // }),
  ],
  exports: [TypeOrmModule, JwtModule, PassportModule, ConfigModule],
})
export class AuthModule {}
