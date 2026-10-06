package com.parent.gateway.config;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfig {


    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                //authorization path for auth and access to user information (validation)--------------------------------------------------------------
                .route(p -> p
                        .path("/auth/**")
                        .filters(f -> f.addRequestHeader("user-service", "Request"))
                        .uri("lb://user"))
                //authorization path for user (validation)--------------------------------------------------------------
                .route(p -> p
                        .path("/users/**")
                        .filters(f -> f.addRequestHeader("user-service", "Request"))
                        .uri("lb://user"))

                .route(p -> p
                        .path("/games/**")
                        .filters(f -> f.addRequestHeader("game-service", "Request"))
                        .uri("lb://game"))

                .build();
    }
}
