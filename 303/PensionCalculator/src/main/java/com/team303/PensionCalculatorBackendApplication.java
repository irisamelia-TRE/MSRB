package com.team303;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PensionCalculatorBackendApplication {

	public static void main(String[] args) {
		System.getProperties().put("server.port",80);
		SpringApplication.run(PensionCalculatorBackendApplication.class, args);
	}
}
