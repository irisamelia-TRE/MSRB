package com.team303.PensionCalculatorAPI;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import com.team303.PensionCalculatorAPI.Employment;
import com.team303.PensionCalculatorAPI.Employment.EmploymentSerializer;

@SpringBootConfiguration
public class SpringBootConfigs {
	private EmploymentSerializer employmentSerializer = new EmploymentSerializer();
	
	@Bean
	public Jackson2ObjectMapperBuilderCustomizer addCustomGroupClassificationSerializer() {
        return new Jackson2ObjectMapperBuilderCustomizer() {
            @Override
            public void customize(Jackson2ObjectMapperBuilder jacksonObjectMapperBuilder) {
                jacksonObjectMapperBuilder.serializerByType(Employment.class, employmentSerializer);
            }
        };
    }
}
