import config.DatabaseConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;



@SpringBootApplication
@EnableJpaRepositories("dao")
@EntityScan("model")
@ComponentScan("controller, service, config, dao")
public class App {
  public static void main(String[] args) {
    SpringApplication.run(App.class);
  }
}
