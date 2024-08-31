package com.carikerja.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carikerja.backend.model.User;
import com.carikerja.backend.model.JobSeeker;
import com.carikerja.backend.model.Employer;
import com.carikerja.backend.repository.UserRepository;
import com.carikerja.backend.repository.JobSeekerRepository;
import com.carikerja.backend.repository.EmployerRepository;
import com.carikerja.backend.service.JwtService;
import com.nimbusds.jose.JOSEException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final JwtService jwtService;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final JobSeekerRepository jobSeekerRepository;

    @Autowired
    private final EmployerRepository employerRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthController(JwtService jwtService, UserRepository userRepository, PasswordEncoder passwordEncoder,
            JobSeekerRepository jobSeekerRepository, EmployerRepository employerRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jobSeekerRepository = jobSeekerRepository;
        this.employerRepository = employerRepository;
    }

    @PostMapping("sign-up")
    public ResponseEntity<User> register(@RequestBody User user) {
        try {
            // Enkripsi password sebelum menyimpan
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Simpan pengguna ke tabel user
            User savedUser = userRepository.save(user);

            // Cek peran yang dikirim dan tambahkan ke tabel yang sesuai dengan email
            if (user.getRole().equals("JOB_SEEKER")) {
                // Buat entitas Job Seeker baru dengan email yang sama
                JobSeeker jobSeeker = new JobSeeker();
                jobSeeker.setUser(savedUser);
                jobSeeker.setEmail(savedUser.getEmail()); // Set email
                jobSeekerRepository.save(jobSeeker);

            } else if (user.getRole().equals("EMPLOYER")) {
                // Buat entitas Employer baru dengan email yang sama
                Employer employer = new Employer();
                employer.setUser(savedUser);
                employerRepository.save(employer);
            }

            // Jika role adalah ADMIN, cukup tambahkan ke tabel User
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("sign-in")
    public ResponseEntity<Map<String, String>> signIn(@RequestParam String email, @RequestParam String password,
            HttpServletResponse response) throws JOSEException {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            if (passwordEncoder.matches(password, user.getPassword())) {
                String token = jwtService.create(user.getId().toString());

                Cookie cookie = new Cookie("token", token);
                cookie.setHttpOnly(true);
                cookie.setMaxAge(60 * 60 * 24 * 7);
                cookie.setPath("/");
                response.addCookie(cookie);

                // Kembalikan token sebagai JSON
                Map<String, String> responseBody = new HashMap<>();
                responseBody.put("token", token);
                return ResponseEntity.ok(responseBody);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("me")
    public User me() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @PostMapping("sign-out")
    public void signOut(HttpServletResponse response) {
        jwtService.signOut(response);
    }
}
